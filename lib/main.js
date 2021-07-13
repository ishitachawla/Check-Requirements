"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var github = __importStar(require("@actions/github"));
var fs = __importStar(require("fs"));
var core_1 = require("@octokit/core");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.readdir('./', function (err, files) {
                if (err) {
                    console.log(err);
                }
                else {
                    var secret_token = core.getInput('GITHUB_TOKEN');
                    var octokit = new core_1.Octokit({
                        auth: secret_token,
                    });
                    var repository = github.context.repo.repo;
                    var ownername = github.context.repo.owner;
                    //Check for example and Contribution in README
                    readmeChecks(repository, ownername, secret_token, octokit);
                    //Check for CODEOWNERS file in .github folder
                    codeOwnerCheck();
                    //Check if nodemodules folder is present in master branch for typescript action
                    nodeModulesCheck();
                    //check for branch permissions in main/master and releases/*
                    branchPermissionCheck(repository, ownername, secret_token, octokit);
                    //check for nodemodules folder in releases/*
                    releasesNodeModulesCheck(repository, ownername, secret_token, octokit);
                    //check for security/vulnerability bot
                    vulnerabilityBotCheck(repository, ownername, secret_token, octokit);
                    //1. check whether issue-template has been set up and 2. default label is need-to-triage
                    issueTemplateCheck();
                    //Check whether standard labels have been set up
                    standardLabelsCheck(repository, ownername, secret_token, octokit);
                }
            });
            return [2 /*return*/];
        });
    });
}
function readmeChecks(repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var current, contents, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('README file is present');
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/contents/README.md', {
                            repo: repository,
                            owner: ownername,
                            headers: { Authorization: 'Bearer ' + secret_token
                            }
                        })];
                case 1:
                    current = _a.sent();
                    contents = Buffer.from(current.data.content, "base64").toString("utf8");
                    if (contents.includes('Example')) {
                        console.log('Example workflow is present');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function codeOwnerCheck() {
    var files = fs.readdirSync('https://github.com/ishitachawla/Requirement-testing/tree/main/.github');
    var includesCodeOwners = files.includes('CODEOWNERS');
    if (includesCodeOwners) {
        console.log('CODEOWNERS file is present');
    }
    else {
        core.setFailed('Please add CODEOWNERS file');
    }
}
function getExtension(filename) {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length);
}
function nodeModulesCheck() {
    fs.readdir('./src', function (err, filelist) {
        for (var i = 0; i < filelist.length; i++) {
            if (getExtension(filelist[i]) === 'ts') {
                fs.readdir('./', function (err, files) {
                    var includes_node_modules = files.includes('node_modules');
                    if (includes_node_modules) {
                        core.setFailed('Please remove node_modules folder from master');
                    }
                    else {
                        console.log('node_modules folder is not present in master');
                    }
                });
                break;
            }
        }
    });
}
function branchPermissionCheckHelper(branchname, repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews', {
                            repo: repository,
                            owner: ownername,
                            branch: branchname,
                            headers: { Authorization: 'Bearer ' + secret_token
                            }
                        })];
                case 1:
                    result = _a.sent();
                    if (result.data.require_code_owner_reviews === false) {
                        core.setFailed('Please enable Require review from Code Owners for ' + branchname);
                    }
                    else {
                        console.log('Require pull request reviews before merging is enabled for ' + branchname);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    core.setFailed('Please enable Require review from Code Owners for ' + branchname);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function branchPermissionCheck(repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var result, i, branchname, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/branches', {
                            owner: ownername,
                            repo: repository,
                            headers: { Authorization: 'Bearer ' + secret_token
                            }
                        })];
                case 1:
                    result = _a.sent();
                    for (i = 0; i < result.data.length; i++) {
                        if (result.data[i].name.substring(0, 9) === 'releases/' || result.data[i].name === 'main' || result.data[i].name === 'master') {
                            branchname = result.data[i].name;
                            branchPermissionCheckHelper(branchname, repository, ownername, secret_token, octokit);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function releasesNodeModulesCheck(repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var result, i, branchname, branch, flag, j, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/branches', {
                            owner: ownername,
                            repo: repository,
                            headers: { Authorization: 'Bearer ' + secret_token
                            }
                        })];
                case 1:
                    result = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < result.data.length)) return [3 /*break*/, 5];
                    if (!(result.data[i].name.substring(0, 9) === 'releases/')) return [3 /*break*/, 4];
                    branchname = result.data[i].name;
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/contents', {
                            owner: ownername,
                            repo: repository,
                            ref: branchname,
                            headers: { Authorization: 'Bearer ' + secret_token
                            }
                        })];
                case 3:
                    branch = _a.sent();
                    flag = 0;
                    for (j = 0; j < branch.data.length; j++) {
                        if (branch.data[j].name === 'node_modules') {
                            flag = 1;
                            console.log('node_modules folder is present in ' + branchname);
                        }
                    }
                    if (flag === 0) {
                        core.setFailed('Please add node_modules to ' + branchname);
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function vulnerabilityBotCheck(repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/vulnerability-alerts', {
                            repo: repository,
                            owner: ownername,
                            headers: {
                                Authorization: 'Bearer ' + secret_token,
                            },
                            mediaType: {
                                previews: [
                                    'dorian'
                                ]
                            }
                        })];
                case 1:
                    result = _a.sent();
                    if (result.status == 204) {
                        console.log('Vulnerability bot is enabled');
                    }
                    else {
                        core.setFailed('Please enable vulnerability bot');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    core.setFailed('Please enable vulnerability bot');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function issueTemplateCheck() {
    fs.readdir('./.github', function (err, folders) {
        var includesISSUE_TEMPLATE = folders.includes('ISSUE_TEMPLATE');
        if (includesISSUE_TEMPLATE) {
            console.log('ISSUE_TEMPLATE is set up');
            defaultLabelCheck();
        }
        else {
            core.setFailed('Please set up ISSUE_TEMPLATE');
        }
    });
}
function defaultLabelCheck() {
    fs.readdir('./.github/ISSUE_TEMPLATE', function (err, filelist) {
        var i = 0;
        while (i < filelist.length) {
            if (getExtension(filelist[i]) === 'md') {
                var data = fs.readFileSync('./.github/ISSUE_TEMPLATE/' + filelist[i]);
                if (data.includes('need-to-triage')) {
                    console.log('Default label is need-to-triage');
                    break;
                }
            }
            i++;
        }
        if (i == filelist.length)
            core.setFailed('Please set default label as need-to-triage');
    });
}
function standardLabelsCheck(repository, ownername, secret_token, octokit) {
    return __awaiter(this, void 0, void 0, function () {
        var result, labelArray, existingLabels, absentLabels, i, standardLabelsArray, i, label, errorOutput, i, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, octokit.request('GET /repos/{owner}/{repo}/labels', {
                            repo: repository,
                            owner: ownername,
                            headers: {
                                Authorization: 'Bearer ' + secret_token,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    labelArray = result.data;
                    existingLabels = new Set();
                    absentLabels = new Array();
                    for (i = 0; i < labelArray.length; i++) {
                        existingLabels.add(labelArray[i].name);
                    }
                    standardLabelsArray = ['need-to-triage', 'idle', 'question', 'bug', 'P0', 'P1', 'enhancement', 'documentation', 'backlog', 'performance-issue', 'waiting-for-customer'];
                    for (i = 0; i < standardLabelsArray.length; i++) {
                        label = standardLabelsArray[i];
                        if (!existingLabels.has(label)) {
                            absentLabels.push(label);
                        }
                    }
                    if (absentLabels.length == 0) {
                        console.log('Standard labels are present');
                    }
                    else {
                        errorOutput = absentLabels[0];
                        for (i = 1; i < absentLabels.length; i++) {
                            errorOutput = errorOutput + ', ' + absentLabels[i];
                        }
                        core.setFailed('Please add standard labels: ' + errorOutput);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    console.log(err_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
