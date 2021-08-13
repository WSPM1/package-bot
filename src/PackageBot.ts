//import { Collection } from 'discord.js'

const Discord = require('discord.js')
const { debugPrefix, prefix } = require('../config.json')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })
const token = process.env.BOT_TOKEN
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: 'Tracking Packages!',
            type: 'PLAYING',
        },
    },
})

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err: string) => {
    console.log(err)
})

/*
;(async () => {
    console.log('asdf')
    const asdf: any = await trackPackage('51687791086', 'gls')
    console.log(asdf)
})()
*/

//client.commands = new Collection()
//client.commands.set(showList.help.name, showList)

client.once('ready', async () => {
    console.log('\x1b[32m' + '\x1b[1m' + 'PackageBot is ready!' + '\x1b[0m')
})

client.on('message', async (message: any) => {
    if (message.content.toLowerCase().startsWith(`${prefix}add`)) {
        try {
            const pcg = new Package({ packageNum: '0000293235010U', courier: 'dpd', note: 'Cool note!' })

            await addPackage(pcg)
        } catch (err) {
            message.channel.send(err)
        }
    }
    if (message.content.toLowerCase().startsWith(`${debugPrefix} add`)) {
        const addAmount: number = parseInt(message.content.split(' ')[2])

        for (var i: number = 1; i <= addAmount; i++) {
            var pcg = new Package({ packageNum: i, courier: 'dpd', note: i.toString() })
            await addPackage(pcg, true)
        }
    }
    if (message.content.toLowerCase().startsWith(`${prefix}list`)) {
        showList(message.channel)
    }
})

client.login(token)

export default client

// load after client export

var { Package } = require('./modules/packageClass')
var addPackage = require('./modules/addPackage')
//var sendMessage = require('./modules/sendMessage')
var showList = require('./modules/showList')
