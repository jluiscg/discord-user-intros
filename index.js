const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

//set events
client.on('ready', () => {
    //List connected servers
    console.log('Wrestling intros bot live on:');
    client.guilds.cache.forEach((guild) => {
      console.log(`○ ${guild.name}`);
    });
  });

client.on('voiceStateUpdate', async (oldMemberState, newMemberState) => {
  if(oldMemberState.channel == null && newMemberState.channel != null && config.users[newMemberState.member.id]){
      //user connected to a voice channel (not changed)
      //get song path from config
      var song_path = config.users[newMemberState.member.id].audio.source;
      //get channel where the user just connected
      voice_channel = newMemberState.channel;
      //connect to that channel
      voice_connection = await voice_channel.join();
      //play corresponding sound and set a dispatcher to disconnect when it's finished
      const dispatcher = voice_connection.play(song_path, {seek : config.users[newMemberState.member.id].audio.start});

      dispatcher.on('start', () => {
        console.log(song_path + ' is now playing!');
      });

      dispatcher.on('finish', () => {
        console.log('Stopped playing!');
        voice_channel.leave();
      });

      dispatcher.on('error', console.error);
  }
});
//connect bot
client.login(config.discord_secret_token);