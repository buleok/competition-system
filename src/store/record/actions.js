import { SET_RECORD_LIST, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../mutation-types'
import { getRecordList, addRecord, updateRecord, deleteRecord } from '../../plugins/api'
import { message } from 'ant-design-vue'

export default {
  [SET_RECORD_LIST] ({ commit }) {
    return new Promise((resolve, reject) => {
      getRecordList().then(({ data: records }) => {
        resolve(records)
        commit(SET_RECORD_LIST, records)
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      })
    })
  },
  [ADD_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addRecord(record).then(({ data }) => {
        resolve(data)
        commit(ADD_RECORD, data)
        message.success('添加成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [UPDATE_RECORD] ({ commit }, { id, data: record }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateRecord(id, record).then(({ data }) => {
        resolve(data)
        commit(UPDATE_RECORD, { id, record })
        message.success('更新成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [DELETE_RECORD] ({ commit }, id) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteRecord(id).then(({ data }) => {
        resolve(data)
        commit(DELETE_RECORD, id)
        message.success('删除成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  }
}
