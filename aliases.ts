import { addAliases } from "module-alias";

addAliases({
  "@n-configs": `${__dirname}/configs`,
  "@n-database": `${__dirname}/database`,
  "@n-decorators": `${__dirname}/decorators`,
  "@n-dtos": `${__dirname}/dtos`,
  "@n-constants": `${__dirname}/constants`,
  "@n-models": `${__dirname}/models`,
  "@n-filters": `${__dirname}/filters`,
  "@n-guards": `${__dirname}/guards`,
  "@n-interceptors": `${__dirname}/interceptors`,
  "@n-middlewares": `${__dirname}/middlewares`,
  "@n-modules": `${__dirname}/modules`,
  "@n-pipes": `${__dirname}/pipes`,
  "@n-shared": `${__dirname}/shared`,
  "@n-exceptions": `${__dirname}/filter-exceptions`,
  "@n-utils": `${__dirname}/utils`,
});
