import { Injectable } from "@nestjs/common";
import XLSX from "xlsx";
import { BaseException } from "@n-exceptions";
import { Errors } from "@n-constants";
import { CreateLibBookDto } from "./dto";
import { LibrariesRepository } from "./libraries.repository";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import puppeteer from "puppeteer";
@Injectable()
export class LibrariesService {

  constructor(private readonly librariansRepository: LibrariesRepository) {
    
  }

  /**
   * Process Excel file to update library data and generate a chart image.
   *
   * @param fileBuffer - Buffer of the uploaded Excel file.
   * @returns - A buffer of the generated chart image.
   */
  async processExcelAndGenerateChart(fileBuffer: Buffer) {
    try {
      // Read Excel file
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet);

      if (!data || data.length === 0) {
        throw new BaseException(Errors.UPLOAD.FILE_EMPTY);
      }

      // Map and validate data
      const libBooks: CreateLibBookDto[] = [];
      for (const item of data) {
        try {
          const mappedItem = {
            id: uuidv4(),
            bookTitle: item["Tên sách"],
            remainingBooks: Number(item["Tổng số sách"]),
            borrowedBooks: Number(item["Đã mượn"]),
            publisher: item["Nhà xuất bản"],
            publishedYear: Number(item["Năm xuất bản"]),
          };

          const dto = plainToInstance(CreateLibBookDto, mappedItem);
          const errors = await validate(dto);
          if (errors.length > 0) {
            console.error("Validation errors:", errors);
            continue; 
          }
          libBooks.push(dto);
        } catch (err) {
          console.error("Error processing item:", err);
        }
      }

      // Save to database
      await this.librariansRepository.deleteAll();
      const libraryBooks = libBooks.map((book) => ({
        id: book.id,
        bookTitle: book.bookTitle,
        remainingBooks: book.remainingBooks,
        borrowedBooks: book.borrowedBooks,
        publisher: book.publisher,
        publishedYear: book.publishedYear,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await this.librariansRepository.createMany(libraryBooks);

      // Fetch updated data
      const books = await this.librariansRepository.findAll();
      // Prepare chart data
      const labels = books.map((book) => book.bookTitle); // Book titles
      const totalBooks = books.map((book) => book.remainingBooks); // Total books
      const borrowedBooks = books.map((book) => book.borrowedBooks); // Borrowed books

      // Chart configuration
      const chartHTML = `
        <html>
          <head>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          </head>
          <body>
            <canvas id="myChart" width="800" height="600"></canvas>
            <script>
              const ctx = document.getElementById('myChart').getContext('2d');
              new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ${JSON.stringify(labels)},
                  datasets: [
                    {
                      label: 'Total Books',
                      data: ${JSON.stringify(totalBooks)},
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1,
                    },
                    {
                      label: 'Borrowed Books',
                      data: ${JSON.stringify(borrowedBooks)},
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    }
                  ],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              });
            </script>
          </body>
        </html>
      `;

      // Use Puppeteer to render the chart
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(chartHTML);
      const chartBuffer = await page.screenshot();
      await browser.close();

      return chartBuffer;
    } catch (error) {
      throw new BaseException(Errors.UPLOAD.FILE_CONTENT_INVALID);
    }
  }
}
