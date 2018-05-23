<template>

<div class="container">
  <br>
  <PieChart></PieChart>
  <Total></Total>

  <div id="subscription" class="container">
    <!-- Messages -->
    <md-card v-for="(message, index) in messages" v-bind:key="index" class="card subcard card-expansion">

        <md-card-header>
          <!-- <div class="card-body"> -->
          <!-- Subscription -->
          <h6  class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
        </md-card-header>

          <!-- actions -->
          <md-card-actions md-alignment="space-between">
            <div v-if="message !== editingMessage">
              <a @click.prevent="deleteMessage(message)" href="#" class="card-link">Delete</a>
              <a @click.prevent="editMessage(message)" href="#" class="card-link">Edit</a>
            </div>
            <div v-else>
              <a @click.prevent="cancelEditing" href="#" class="card-link">Cancel</a>
              <a @click.prevent="updateMessage" href="#" class="card-link">Update</a>
            </div>
            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

        <!-- SUBSCRIPTION CONTENT -->
        <md-card-expand>

          <md-card-expand-content>
            <md-card-content>

              <!-- Category -->
              <p v-if="message !== editingMessage" class="card-text">Category: {{ message.category }}</p>
              <div v-else>
                <p>Category:</p>
                <textarea v-model="subCategory" class="form-control"></textarea>
              </div>

              <!-- Price -->
              <p v-if="message !== editingMessage" class="card-text">Price: ${{ message.price }}</p>
              <div v-else>
                <p>Price:</p>
                <textarea v-model="subPrice" class="form-control"></textarea>
              </div>
              <!-- <textarea v-else v-model="subPrice" class="form-control"></textarea> -->

              <!-- Frequency -->
              <p v-if="message !== editingMessage" class="card-text">Frequency: {{ message.frequency }}</p>
              <div v-else>
                <p>Frequency:</p>
                <textarea v-model="subFrequency" class="form-control"></textarea>
              </div>
              <!-- <textarea v-else v-model="subFrequency" class="form-control"></textarea> -->

              <!-- Date -->
              <p v-if="message !== editingMessage" class="card-text">Start Date: {{ message.date }}</p>
              <div v-else>
                <p>Start Date:</p>
                <textarea v-model="subStartDate" class="form-control"></textarea>
              </div>
              <!-- <textarea v-else v-model="subStartDate" class="form-control"></textarea> -->

              <!-- Reminder -->
              <p v-if="message !== editingMessage" class="card-text">Reminder: {{ message.reminder }}</p>
              <div v-else>
                <p>Reminder:</p>
                <textarea v-model="subReminder" class="form-control"></textarea>
              </div>
              <!-- <textarea v-else v-model="subReminder" class="form-control"></textarea> -->

              <!-- Notes -->
              <p v-if="message !== editingMessage" class="card-text">Message: {{ message.text }}</p>
              <div v-else>
                <p>Message:</p>
                <textarea v-model="messageText" class="form-control"></textarea>
              </div>
              <!-- <textarea v-else v-model="messageText" class="form-control"></textarea> -->

            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>

  <hr>
  <div class="card card-outer">

    <!-- New Message -->
    <form v-if="!editingMessage" @submit.prevent="storeMessage">

       <div class="form-group"  v-bind:class="{ invalid: $v.nickname.$error }">
         <label>Subscription:</label>
          <input v-model.trim="nickname" class="form-control" @blur="$v.nickname.$touch()" />
          <p v-if="!$v.nickname.$dirty">Enter a subscription</p>
       </div>
      
         <!-- <div class="form-group" v-bind:class="{ invalid: $v.subCategory.$error }">
           <label>Category:</label>
           <input v-model.trim="subCategory" class="form-control" @blur="$v.subCategory.$touch()" />
            <p v-if="!$v.subCategory.required">Select a valid category</p>
          </div> -->

 <!-- Category -->
       <div class="input-field browser-default">
                   <label>Category:</label><br><br>
         <select class="form-control browser-default" v-model="subCategory" @blur="$v.subCategory.$touch()">
           <option value="" disabled selected>Choose your option</option>
            <option v-for="catOption in catOptions" v-bind:value="catOption.value">
              {{catOption.text}}
            </option>
         </select>
         <p v-if="!$v.subCategory.required">You must select a valid category</p>
       </div>
       
       <!-- price -->
       <div class="form-group" :class="{invalid: $v.subPrice.$error}">
         <label>Price:</label>
         <input v-model.number="subPrice" class="form-control" @blur="$v.subPrice.$touch()" />
       <p v-if="!$v.subPrice.required">Please enter a valid price</p>
       <p v-if="!$v.subPrice.decimal">Please enter a valid price</p>
       </div>

       <!-- frequency -->
       <!-- <div class="form-group" :class="{invalid: $v.subFrequency.$error}">
         <label>Frequency:</label>
         <input v-model="subFrequency" class="form-control" @blur="$v.subFrequency.$touch()" />
         <p v-if="!$v.subFrequency.required">Enter the subscription frequency</p>
       </div> -->

        <!-- Frequency dropdown -->
        <div class="input-field browser-default">
          <label>Frequency:</label><br><br>
            <select class="form-control browser-default" v-model="subFrequency" @blur="$v.subFrequency.$touch()">
            <option value="" disabled selected>Choose your duration</option>
            <option v-for="duration in durations" v-bind:value="duration.value">
              {{duration.text}}
            </option>
         </select>
         <p v-if="!$v.subFrequency.required">Please select a valid duration</p>
       </div>
       <!-- date -->
       <div class="form-group" :class="{invalid: $v.subStartDate.$error}">
         <label>Start Date:</label>
         <input v-model="subStartDate" class="form-control" @blur="$v.subStartDate.$touch()" />
          <p v-if="!$v.subStartDate.required">Enter a valid start date for your subscription</p>
       </div>
       <!-- reminder -->
       <div class="form-group" > 
         <label>Reminder:</label>
         <input v-model="subReminder" class="form-control"/>
       </div>
       <!-- notes -->
       <div class="form-group">
         <label>Message:</label>
         <textarea v-model="messageText" class="form-control"></textarea>
       </div>

        <br>
       <button type="submit" :disabled="$v.$invalid" class="btn btn-primary btn-send">Add Subscription</button>
    </form>
   </div>
</div>

</template>

<script>
import "vue-material/dist/vue-material.min.css";
import { MdCard } from "vue-material/dist/components";
import PieChart from "@/components/home/PieChart";
import Total from "@/components/home/Total";
import db from "@/firebase/init";
import firebase from "firebase";
import { required, decimal } from 'vuelidate/lib/validators'

export default {
  name: "Subscript",
  name: "CardExpansion",
  components: {
    PieChart,
    Total
  },
  data() {
    return {
      messages: [],
      messageText: "",
      nickname: "",
      subCategory: "",
      catOptions: [
        { text: "Food", value: "Food" },
        { text: "Entertainment", value: "Entertainment" },
        { text: "Games", value: "Games" },
        { text: "Books", value: "Shopping" },
        { text: "Music", value: "Music" },
        { text: "Miscellaneous", value: "Miscellaneous" }
      ],
       durations: [
        {text: 'Monthly', value: 'Monthly'},
        {text: 'Quarterly', value: 'Quarterly'},
        {text: 'Annually', value: 'Annually'}
      ],
      subPrice: "",
      subFrequency: "",
      subStartDate: "",
      subReminder: "",
      editingMessage: null,
      user: null
    };
  },

  validations: {
    nickname: {
      required
    },
    subCategory: {
      required
    },
    subPrice: {
      required,
      decimal
    },
    subFrequency: {
      required
    },
    subStartDate: {
      required
    },
    subStartDate: {
      required
    }
    //For future dev when adding a reminder
    // subReminder: {
    //   required
    // }
  },

  created() {
    let ref = db.collection("users");
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.user = user.data();
      });

    db
      .collection("subscriptions")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          if (change.type == "added") {
            this.messages.push({
              id: change.doc.id,
              text: change.doc.data().text,
              nickname: change.doc.data().nickname,
              price: change.doc.data().price,
              category: change.doc.data().category,
              frequency: change.doc.data().frequency,
              date: change.doc.data().date,
              reminder: change.doc.data().reminder
            });
          } else if (change.type == "removed") {
            const index = this.messages.indexOf(change.doc.data().id);
            this.messages.splice(index, 1);
            console.log(index);
          } else if (change.type == "modified") {
            console.log("FINDING");
            const updatedMessage = this.messages.find(
              message => message.id === change.doc.id
            );
            const index = this.messages.indexOf(updatedMessage);
            console.log(index);
            this.messages[index].text = change.doc.data().text;
            this.messages[index].category = change.doc.data().category;
            this.messages[index].price = change.doc.data().price;
            this.messages[index].frequency = change.doc.data().frequency;
            this.messages[index].date = change.doc.data().date;
            this.messages[index].reminder = change.doc.data().reminder;
            console.log(change.doc.data());
          }
        });
      });
  },
  methods: {
    storeMessage() {
      db.collection("subscriptions").add({
        to: this.$route.params.id,
        // from: this.user.id,
        text: this.messageText,
        nickname: this.nickname,
        price: this.subPrice,
        category: this.subCategory,
        frequency: this.subFrequency,
        date: this.subStartDate,
        reminder: this.subReminder
      });
      this.messageText = "";
      this.nickname = "";
      this.subCategory = "";
      this.subPrice = "";
      this.subFrequency = "";
      this.subStartDate = "";
      this.subReminder = "";
    },
    deleteMessage(message) {
      db
        .collection("subscriptions")
        .doc(message.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      console.log(message.id);
    },

    editMessage(message) {
      this.editingMessage = message;
      this.messageText = message.text;
      this.subCategory = message.category;
      this.subPrice = message.price;
      this.subFrequency = message.frequency;
      this.subStartDate = message.date;
      this.subReminder = message.reminder;
    },
    cancelEditing() {
      this.editingMessage = null;
      this.messageText = "";
      this.subCategory = "";
      this.subPrice = "";
      this.subFrequency = "";
      this.subStartDate = "";
      this.subReminder = "";
    },
    updateMessage() {
      // Careful with this one!!!!!!
      db
        .collection("subscriptions")
        .doc(this.editingMessage.id)
        .update({
          text: this.messageText,
          category: this.subCategory,
          price: this.subPrice,
          frequency: this.subFrequency,
          date: this.subStartDate,
          reminder: this.subReminder
        });
      this.cancelEditing();
    }
  }
};
</script>

<style>
.btn-send {
  background-color: #687864;
}
.card-expansion {
  height: 480px;
}
.card-link {
  padding: 10px;
}
.card-outer {
  padding: 10px;
}
.card-subtitle {
  font-size: 25px;
  font-family: "Noto Sans", sans-serif;
}
.card-text {
  margin: 0 0 0 10;
}
.form-group p {
  color: red;
}
.input.invalid input {
  border: 1px solid red;
  background-color: rgb(214, 72, 72);
}
.input.invalid label {
  color: red;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.subcard {
  color: #161d6e;
  padding: 10px;
  margin: 15px;
}
</style>
