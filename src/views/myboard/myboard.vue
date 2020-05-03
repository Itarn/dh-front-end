<script>
import editorService from '../../service/editor.service'
import { createNamespace } from '../../utils'
import baseButton from '../../components/base/button'

const [, bem] = createNamespace('myboard')

export default {
  data () {
    return {
      myPageList: []
    }
  },
  components: {
    baseButton
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      editorService.getMyPageList()
        .then(res => {
          this.myPageList = res.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    genWebsite (data = {}) {
      data.name = '我的站点'
      editorService.addPage(data)
        .then(res => {
          this.$router.push(`/edit/${res.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  render () {
    return (
      <div class={ [bem()] }>
        { /* 头部 */ }
        <div class={ [bem('header')] }>
          <div class={ ['layout-content'] }>
            <div class={ [bem('logo')] }>
              { /* <img src={ require('../../assets/img/logo.png') } alt="" /> */ }
              上线了
            </div>
          </div>
        </div>

        <div class={[bem('body'), 'layout-content']}>
          <base-button type="primary" size="large" onClick={() => { this.genWebsite() }}>创建网站</base-button>

          <div class={ bem('mysites') }>
            {
              this.myPageList.map(item => {
                return <div class={ bem('mysite') } onClick={ () => { this.$router.push(`/edit/${item.id}`) } }>
                  <div class={ bem('mysite-logo') }>我的网站ID：{ item.id }</div>
                </div>
              })
            }
          </div>
        </div>

      </div>
    )
  }
}
</script>

<style lang="scss" scoped >
@import '../../assets/css/_var.scss';

.#{$prefix}-myboard {

  &__header {
    background-color: $purple;
    padding: 15px 0;
  }

  &__logo {
    width: 150px;
    font-size: 14px; font-weight: 600;
    color: #fff;
    img {
      width: 100%;
    }
  }

  &__body {
    padding-top: 35px;
  }

  &__mysites {
    padding: 35px 0;
  }

  &__mysite {
    margin-bottom: 30px;
  }

  &__mysite-logo {
    width: 120px; height: 120px;
    display: flex; justify-content: center; align-items: center;
    border: 1px solid #000;
    border-radius: 2px;
    cursor: pointer;
  }

}

</style>
