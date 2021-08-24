/**
 * User: Bc. Milián Daniel
 * Date: 27/07/2021
 * Time: 18:07
 */

import {Bot} from "./bot";

import * as _Config from "./config.json";
import * as _Messages from "./messages.json";
import * as _Auth from "./auth.json";
import * as _Package from "./package.json";

export let Config = _Config;
export let Messages = _Messages;
export let Auth = _Auth;
export let Package = _Package;

import * as Services from "./libs/Services";
import * as Logger from "./libs/Logger";
import {Client} from "discord.js";
import * as _Database from "./libs/DB";

export let Database = _Database;

import {VerificationService} from "./services/VerificationService";
import {StudentCheckService} from "./services/StudentCheckService";
import {AdminService} from "./services/AdminService";
import {ChannelCleanService} from "./services/ChannelCleanService";
import {PostingService} from "./services/PostingService";
import {PollService} from "./services/PollService";
import {StudentInfoScraperService} from "./services/StudentInfoScraperService";
import {CheckerLogService} from "./services/CheckerLogService";
import {DatabaseManagerService} from "./services/DatabaseManagerService";

// const WebService = require("./services/WebService");
//const PinService = require("./services/PinService");
//const PermissionService = require("./services/PermissionService");

let bots: Bot[] = [];
let currentBot: Bot = null;

/**
 * Returns bot by name.
 * @param {string} name
 * @return {Bot}
 */
export function GetBot(name: string) {
    for (let i = 0; i < bots.length; ++i) {
        if (bots[i].name === name) return bots[i];
    }
    return null;
}

export function SetCurrentBot(client: Client) {
    for (let i = 0; i < bots.length; ++i) {
        if (bots[i].client === undefined)
            continue;
        if (bots[i].client.user.id === client.user.id) {
            currentBot = bots[i];
            return;
        }
    }
}

/**
 * Returns current executing bot.
 * @return {Bot}
 */
export function GetCurrentBot() {
    return currentBot;
}

/**
 * Checks if specified ID is bot's ID.
 * @param {string} id
 * @return {boolean}
 */
export function IsBotId(id: string) {
    for (let i = 0; i < bots.length; ++i) {
        if (bots[i].client.user.id === id) return true;
    }
    return false;
}

let start = () => {
    let keys = Object.keys(Auth.bots);
    for (let i = 0; i < keys.length; ++i) {
        Logger.Info(`Registering bot ${keys[i]}.`);
        let token = Auth.bots[keys[i]];
        bots.push(new Bot(keys[i], token));
    }

    Services.AddService(new VerificationService());
    // Services.AddService(new StudentCheckService());
    Services.AddService(new AdminService());
    Services.AddService(new ChannelCleanService());
    Services.AddService(new PostingService());
    Services.AddService(new PollService());
    // Services.AddService(new StudentInfoScraperService());
    // Services.AddService(new WebService());
    Services.AddService(new CheckerLogService());
    //Services.AddService(new PinService());
    //Services.AddService(new PermissionService());
    Services.AddService(new DatabaseManagerService());
    Logger.Info("Ready. Version: " + Package.version);
};

start();