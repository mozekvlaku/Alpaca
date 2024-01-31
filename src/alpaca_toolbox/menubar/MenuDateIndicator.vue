<template>
  <div>
    <div class="MenuDate">
      <b-datepicker :mobile-native="false" :locale="locale_computed" position="is-bottom-left">
        <template v-slot:trigger>
          {{date}} &nbsp; <b>{{ time }}</b>
        </template>
      </b-datepicker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuDateIndicator',
    components: {

    },
    props: {
      locale: String,
      format: String
    },
    computed: {
      locale_computed() {
        if (this.locale == null)
          return "en-US";
        else
          return this.locale.replace("_", "-");
      }
    },
    data() {
      return {
        date: "",
        time: ""
      }
    },
    methods: {
      get_now: function () {
        let today = new Date();

        this.date = this.format_date((today.getMonth() + 1), today.getDate());

        this.time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

      },
      format_date: function (month, day) {
        if (this.format == "short") {
          switch (this.locale) {
            case "cs_CZ":
              return day + "." + month;
            case "ns_FE":
              return day + "." + month;
            case "en_US":
              return month + "-" + day;
            default:
              return month + "-" + day;
          }
        } else {
          switch (this.locale) {
            case "cs_CZ":
              return day + ". " + this.format_czech_month(month);
            case "ns_FE":
              return day + "ēī " + this.format_nissiian_month(month);
            case "en_US":
              return this.format_english_month(month) + " " + day + this.english_suffix(day);
            default:
              return this.format_english_month(month) + " " + day + this.english_suffix(day);
          }
        }
      },
      format_czech_month:function (number)
      {
        switch(number) {
          case 1: return "ledna";
          case 2: return "února";
          case 3: return "března";
          case 4: return "dubna";
          case 5: return "května";
          case 6: return "června";
          case 7: return "července";
          case 8: return "srpna";
          case 9: return "září";
          case 10: return "října";
          case 11: return "listopadu";
          case 12: return "prosince";
        }
      },
      format_nissiian_month:function (number)
      {
        switch(number) {
          case 1: return "kxeimaa";
          case 2: return "jersseaa";
          case 3: return "caatinea";
          case 4: return "apxrīleaa";
          case 5: return "māya";
          case 6: return "derkxeaa";
          case 7: return "dessilaa";
          case 8: return "sxīsaa";
          case 9: return "lēkesshwa";
          case 10: return "kōssesshwa";
          case 11: return "nyeonesshwa";
          case 12: return "noyīssehwa";
        }
      },
      format_english_month:function (number)
      {
        switch(number) {
          case 1: return "January";
          case 2: return "February";
          case 3: return "March";
          case 4: return "April";
          case 5: return "May";
          case 6: return "June";
          case 7: return "July";
          case 8: return "August";
          case 9: return "September";
          case 10: return "October";
          case 11: return "November";
          case 12: return "December";
        }
      },
      english_suffix: function (number) {
          if (number >= 11 && number <= 13) {
          return 'th';
        }

        const lastDigit = number % 10;

        switch (lastDigit) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      }
      
    },
    created() {
      this.get_now();
      setInterval(this.get_now, 30000);
    },
  }
</script>

<style scoped>
  .MenuDate {
    height: 32px;
    margin-top: 6px;
    cursor: pointer;
    font-size: 0.90rem;
    margin-left: 16px;
  }
</style>