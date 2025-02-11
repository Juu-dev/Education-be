"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrls = void 0;
function parseUrls(fileDocument) {
    if (fileDocument.url && !fileDocument.url.includes('http')) {
        fileDocument.url = `${process.env.CDN_URL}/${fileDocument.url}`;
    }
    if (fileDocument.previewUrl && !fileDocument.previewUrl.includes('http')) {
        fileDocument.previewUrl = `${process.env.CDN_URL}/${fileDocument.previewUrl}`;
    }
    if (fileDocument.thumbUrl && !fileDocument.thumbUrl.includes('http')) {
        fileDocument.thumbUrl = `${process.env.CDN_URL}/${fileDocument.thumbUrl}`;
    }
}
exports.parseUrls = parseUrls;
//# sourceMappingURL=parse-urls.util.js.map