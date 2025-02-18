/**
 * User: Bc. Milián Daniel
 * Date: 15/09/2021
 * Time: 22:01
 */

import * as Main from "../main";
import * as Channels from "./Channels";
import * as Logger from "./Logger";
import * as Roles from "./Roles";
import {EmbedBuilder, Role, TextChannel} from "discord.js";

export abstract class BotLogger {
    private static logsChannel: TextChannel | null = null;

    private constructor() {
    }

    private static async getChannel(): Promise<TextChannel> {
        if (this.logsChannel === null) {
            BotLogger.logsChannel = await Channels.FetchChannel(Main.Config.channels.bot) as TextChannel;
        }
        return BotLogger.logsChannel;
    }

    public static async Error(error: Error, message?: string): Promise<void> {
        Main.SetCurrentBot((await Main.WaitForBot("porter")).client);
        Logger.Error(error.message);
        let developerRole: Role = null;
        if (!Main.DEBUG) {
            developerRole = await Roles.GetRole(Main.Config.roles.developerRole);
        }
        await (await this.getChannel()).send({
            content: (developerRole !== null ? developerRole.toString() + " " : "[DEBUG] ") + "An exception occurred:",
            embeds: [
                new EmbedBuilder()
                    .setColor("#ff9999")
                    .setTitle("MAJOR ERROR\ntype " + error.name + (message !== null && message !== undefined ? "\n\n" + message : ""))
                    .setDescription(error.message + "\n" + error.stack + "\n")
                    .setTimestamp()
                    .setFooter({text: "An exception was handled and bot will continue to run."})
            ]
        });
    }

    public static async Warn(message: string): Promise<void> {
        Main.SetCurrentBot((await Main.WaitForBot("porter")).client);
        Logger.Error(message);
        await (await this.getChannel()).send({
            content: "A self-handled error occurred:",
            embeds: [
                new EmbedBuilder()
                    .setColor("#ffcccc")
                    .setTitle("MINOR ERROR")
                    .setDescription(message)
                    .setTimestamp()
                    .setFooter({text: "An error was handled and bot will continue to run."})
            ]
        });
    }

    public static async Info(key: string, message: string): Promise<void> {
        Main.SetCurrentBot((await Main.WaitForBot("porter")).client);
        Logger.Info(message);
        await (await this.getChannel()).send({
            content: "Important info message:",
            embeds: [
                new EmbedBuilder()
                    .setColor("#f1ffad")
                    .setTitle("IMPORTANT INFO")
                    .setDescription(message)
                    .setTimestamp()
                    .setFooter({text: `Info-key: ${key}`})
            ]
        });
    }
}