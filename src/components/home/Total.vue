<template>
  <div>

    <p>Monthly Expenses: ${{this.subTotal}} </p>
    <p>Annual Expenses: ${{this.annualTotal}} </p>

  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Total",
  data() {
    return {
      subTotal: "",
      annualTotal: ""
    };
  },
  created() {
    db
      .collection("subscriptions")
      .where("to", "==", firebase.auth().currentUser.uid)
      .onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          if (
            change.type == "added" ||
            change.type == "modified" ||
            change.type == "removed"
          ) {
            let monthTotal = 0;
            let yearTotal = 0;
            let quarterTotal = 0;
            snapshot.forEach(function(doc) {
              if (
                doc.data().frequency === "Monthly" ||
                doc.data().frequency === "monthly"
              ) {
                monthTotal += parseFloat(doc.data().price);
              }
              if (
                doc.data().frequency === "Annually" ||
                doc.data().frequency === "annually"
              ) {
                yearTotal += parseFloat(doc.data().price);
                console.log(yearTotal);
              }
              if (
                doc.data().frequency === "Quarterly" ||
                doc.data().frequency === "quarterly"
              ) {
                quarterTotal += parseFloat(doc.data().price);
                console.log(quarterTotal);
              }
              console.log(doc.data().frequency);
              console.log(yearTotal);
            });
            let newYearTotal = yearTotal / 12;
            console.log(newYearTotal);
            let newQuarterTotal = quarterTotal / 4;
            let total = monthTotal + newYearTotal + newQuarterTotal;
            let newTotal = 12 * total
            console.log(total);
            this.subTotal = total.toFixed(2).toString();
            this.annualTotal = newTotal.toFixed(2).toString();
          }
        });
      });
  
  }
};
</script>

<style>
h6 {
  font-family: 'Noto Sans', sans-serif;
  size: 50px;
  text-align: center;
}
p {
  text-align: center;
}
</style>