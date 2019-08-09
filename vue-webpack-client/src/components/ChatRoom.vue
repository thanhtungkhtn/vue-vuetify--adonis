<template>
  <div id="app">
    <h1>Chat Room</h1>
    <input type="text" v-model="inputMessage"/>
    <button @click="sendMessage(inputMessage)" >Send</button>
    <br><hr>
    <ul>
      <li v-bind:key="m" v-for="m in message">
        {{m}}
      </li>
    </ul>
  </div>
</template>

<script>
import 'babel-polyfill'
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')

export default {
  name: 'App',
  components: {

  },
  async created () {
    this.initializeWs()
  },
  data: () => ({
    ws: null,
    chat: null,
    inputMessage: 'Hello',
    message: [
      'Welcome to my ChatRoom',
      'Nice to meet you'
    ]
  }),
  methods: {
    initializeWs: async function () {
      // connect to the server
      ws.connect()
      this.chat = ws.subscribe('chat')

      let chat = this.chat
      chat.on('ready', () => {
        // chat.emit('message', 'hello')
        this.sendMessage('hello')
      })

      chat.on('message', (event) => {
        this.receiveMessage(event)
      })
    },
    sendMessage: async function (message) {
      // alert(this.inputMessage)
      this.chat.emit('message', message)
    },
    receiveMessage: async function (msg) {
      this.message.push(msg)
    }
  }
}
</script>

<style>

</style>
