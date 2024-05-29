"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRepoImpl = void 0;
const core_1 = require("./core");
const queries_1 = require("./queries");
const storage_1 = require("./storage");
const RepoWithQueries = (0, queries_1.AddQueries)(core_1.BaseRepo);
const CompleteRepo = (0, storage_1.AddStorage)(RepoWithQueries);
exports.CatalogRepoImpl = CompleteRepo;
