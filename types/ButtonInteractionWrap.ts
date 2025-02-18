/**
 * User: Bc. Milián Daniel
 * Date: 12/09/2021
 * Time: 21:43
 */
import {ButtonInteraction, GuildMember, Message, ButtonComponent} from "discord.js";

/**
 *
 */
export class ButtonInteractionWrap {
    public readonly caller: GuildMember;
    public readonly button: ButtonComponent;
    public readonly message: Message;
    public readonly interaction: ButtonInteraction;

    constructor(caller: GuildMember, button: ButtonComponent, message: Message, interaction: ButtonInteraction) {
        this.caller = caller;
        this.button = button;
        this.message = message;
        this.interaction = interaction;
    }

}