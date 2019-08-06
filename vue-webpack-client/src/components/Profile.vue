<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>User Name</td>
            <td>{{username}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data () {
    const token = localStorage.usertoken
    const decoded = jwtDecode(token)
    return {
      uid: decoded.uid,
      username: '',
      email: ''
    }
  },
  mounted () {
    axios.get(`/api/getuser/${this.uid}`
    ).then((res) => {
      this.username = res.data.username
      this.email = res.data.email
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
