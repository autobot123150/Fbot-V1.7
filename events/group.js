module.exports = {
    name: "event",

    async execute({ api, event }) {
        if (event.logMessageType === "log:subscribe") {
            try {
                const threadInfo = await api.getThreadInfo(event.threadID);
                const totalMembers = threadInfo.participantIDs.length;
                const botID = api.getCurrentUserID();

                const newUsers = event.logMessageData.addedParticipants;
                for (const user of newUsers) {
                    const userID = user.userFbId;
                    const userName = user.fullName || "warren prst";

                    const mentions = [
                        { tag: `@${userName}`, id: userID },
                        { tag: "@warren", id: "61550188503841" },
                        { tag: "@BotCreator", id: "61550188503841" }
                    ];

                    const message = {
                        body: `👋 Welcome @${userName} to the group!
👥 Total members: ${totalMembers}


👨‍💻[ADMIN] @warren: Pm any message to the bobong owner ng bot if you see problem 

Bot creator:  @BotCreator`,
                        mentions
                    };

                    await api.sendMessage(message, event.threadID);

                    // Set bot nickname if it's the one added
                    if (userID === botID) {
                        const newNickname = "Bot Assistant";
                        await api.changeNickname(newNickname, event.threadID, botID);
                    }
                }
            } catch (err) {
                console.error("❌ Error in group event:", err);
            }
        }
    }
};
