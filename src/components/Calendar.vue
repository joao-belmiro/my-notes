<template>
  <div class="c-card">
    <div class="o-wrapper">
      <div class="y-selector">
        <div class="btn-arrow" @click="changeParamsCalendar(currentYear - 1, monthIndex)">
          <img
            style="rotate: 180deg"
            width="20px"
            height="20px"
            src="@/assets/arrow.svg"
            alt=""
          />
        </div>
        {{ currentYear }}
        <div class="btn-arrow" @click="changeParamsCalendar(currentYear + 1, monthIndex)">
          <img width="20px" height="20px" src="@/assets/arrow.svg" alt="" />
        </div>
      </div>
      <div class="y-selector">
        <div
          :class="['btn-arrow', {'block-button': blockPrev}]"
           @click="changeParamsCalendar(currentYear, monthIndex === 0 ? monthIndex : monthIndex - 1)">
          <img
            style="rotate: 180deg"
            width="20px"
            height="20px"
            src="@/assets/arrow.svg"
            alt=""
          />
        </div>
        <div class="m-box">
        {{ currentMonth }}
        </div>
        <div :class="['btn-arrow', {'block-button': blockNext}]"
        @click="changeParamsCalendar(currentYear, monthIndex < 11 ? monthIndex + 1 : monthIndex)">
          <img width="20px" height="20px" src="@/assets/arrow.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="week-days">
      <ul>
        <li v-for="d in days" :key="d.id">{{ d.name }}</li>
      </ul>
    </div>
    <div class="month-days">
      <ul v-for="(w, index) in matrixMonths" :key="index">
        <li v-for="(d, index) in w" :key="index" @click="toDatNotes(d)">
          <div v-show="d !== ''" class="btn-day">{{ d }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentYear: null,
      currentMonth: null,
      monthIndex: null,
      matrixMonths: null,
      blockPrev: false,
      blockNext: false,
      days: [
        {
          id: 0,
          name: 'Dom'
        },
        {
          id: 1,
          name: 'Seg'
        },
        {
          id: 2,
          name: 'Ter'
        },
        {
          id: 3,
          name: 'Qua'
        },
        {
          id: 4,
          name: 'Qui'
        },
        {
          id: 5,
          name: 'Sex'
        },
        {
          id: 6,
          name: 'Sáb'
        }
      ],
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ]
    }
  },
  mounted () {
    this.loadCurrentYear()
    this.loadCurrentMonth()
    this.matrixMonths = this.generateMonthsDays(
      this.currentYear,
      this.monthIndex
    )
  },
  methods: {
    loadCurrentYear () {
      this.currentYear = new Date().getFullYear()
    },
    loadCurrentMonth () {
      this.monthIndex = new Date().getMonth()
      this.currentMonth = this.months[this.monthIndex]
    },
    changeParamsCalendar (year, monthIndex) {
      if (monthIndex >= 0 && monthIndex <= 11) {
        this.currentYear = year
        this.monthIndex = monthIndex
        this.blockPrev = false
        this.blockNext = false
        this.currentMonth = this.months[monthIndex]
        this.matrixMonths = this.generateMonthsDays(year, monthIndex)
      }
      this.blockPrev = monthIndex <= 0
      this.blockNext = monthIndex >= 11
    },
    generateMonthsDays (currentYear, currentMonthIndex) {
      const monthMatrix = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
      ]
      var indexWeek = 0
      const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0)
      const firstDay = new Date(currentYear, currentMonthIndex, 1)
      var weekDay = firstDay.getDay()
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        monthMatrix[indexWeek][weekDay] = day
        if (weekDay === 6) {
          indexWeek++
          weekDay = 0
        } else {
          weekDay++
        }
      }
      return monthMatrix
    },
    toDatNotes (day) {
      const param64 = btoa(`${this.currentYear}-${this.monthIndex + 1}-${day}`)
      if (this.validateSameDay(day)) this.$router.push({ name: 'dayNotes', params: { id: param64 } })
    },
    validateSameDay (dayClicked) {
      if (this.$route.params.id) {
        const day = atob(this.$route.params.id).split('-')[2]
        return Number(day).valueOf() !== dayClicked
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.c-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  .o-wrapper {
    background-color: $contrast;
    padding: 1rem;
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    font-weight: 600;
    color: $background;
    letter-spacing: 2px;
    font-size: 1rem;

    .y-selector {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      .m-box {
        text-align: center;
        width: 100px;
      }
    }
  }

  .week-days ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 1rem;
    li {
      width: 14.3%;
      list-style: none;
      text-align: center;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  .month-days {
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;

    ul {
      width: 100%;
      display: flex;
      flex-direction: row;

      li {
        width: 14.3%;
        text-align: center;
        list-style: none;
        font-weight: 600;
        letter-spacing: 1px;

        .btn-day {
          padding: 12px;

          &:hover {
            border-radius: 10px;
            cursor: pointer;
            color: $text-dark;
            background-color: rgba(208, 210, 220, 0.5);
          }
        }

      }
    }
  }
}
</style>
