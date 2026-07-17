"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clorinde = void 0;
const profile_1 = require("./profile");
const stats_1 = require("./stats");
const build_1 = require("./build");
const teams_1 = require("./teams");
exports.clorinde = {
    ...profile_1.profile,
    stats: stats_1.stats,
    ...build_1.build,
    teams: teams_1.teams
};
