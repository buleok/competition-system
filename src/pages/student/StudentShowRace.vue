<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="赛事信息列表"
      sub-title="请根据提示操作"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group class="button-group">
          <a-button
            type="primary"
            @click="exportExcel"
          >
            导出Excel
          </a-button>
          <a-button @click="init">
            刷新
          </a-button>
        </a-button-group>
      </template>
    </a-page-header>
    <ShowRace
      type="student"
      :races="races"
      @add-record="onAddRecord"
    />
    <AddRecord
      :visible.sync="addRecordVisible"
      :race="curRace"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { makeExcel } from '../../utils/excel'
import { SET_RACE_LIST } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
import ShowRace from '../../components/race/ShowRace'
import AddRecord from '../../components/record/AddRecord'
const { mapState, mapActions } = createNamespacedHelpers('races')

export default {
  name: 'StudentShowRace',
  components: {
    ShowRace,
    AddRecord
  },
  inject: ['init'],
  data () {
    return {
      addRecordVisible: false,
      curRace: {}
    }
  },
  computed: {
    ...mapState({
      races: 'races'
    })
  },
  methods: {
    ...mapActions({
      setRaceList: SET_RACE_LIST
    }),
    exportExcel () {
      makeExcel({
        races: this.races.map(item => {
          const temp = omit(item, ['_id'])
          temp.date = new Date(temp.date)
          return temp
        })
      })
    },
    onAddRecord (race) {
      this.addRecordVisible = true
      this.curRace = race
    }
  }
}
</script>

<style scoped>

</style>
