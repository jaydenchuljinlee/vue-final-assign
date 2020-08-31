<template>
  <el-container class="perf_section">

    <!-- 헤더 영역 -->
    <el-header class="perf_header">
      <el-col :span="12">
        <span>성능/운영</span>
      </el-col>
      <el-col :span="12">
        <i class="fas fa-align-justify"></i>
        <i class="fas fa-align-justify"></i>
        <i class="fas fa-align-justify"></i>
      </el-col>
    </el-header>

    <el-container>

      <!-- 사이드 영역 -->
      <el-aside class="perf_aside perf_contents">

        <!-- 서비스 검색 인풋 -->
        <el-row class="service_search">
          <el-input class="round"
                    v-model="inputService"
                    placeholder="서비스 검색"
                    suffix-icon="el-icon-search"
                    size="small"></el-input>
        </el-row>

        <!-- 서비스 트리 -->
        <el-row class="service_tree">
          <el-tree :data="getTreeData"
                   :filter-node-method="filterNode"
                   @node-click="handleNodeClick"
                   ref="tree"></el-tree>
        </el-row>
      </el-aside>

      <!-- 콘텐츠 영역 -->
      <el-container class="perf_contents">

        <!-- 콘텐츠 헤더 영역 -->
        <el-header class="perf_contents_header perf_contents">
          <span>{{ getTitle.label }}</span>
          <span class="sub_title" v-if="getTitle.treeType==='NETDEVICE'">{{ getTitle.objIp }}</span>
        </el-header>

        <!-- 콘텐츠 메인 영역 -->
        <el-main class="perf_contents_main perf_contents">

          <!-- tab 메뉴 -->
          <el-tabs>
            <el-tab-pane label="성능 조회" name="first"></el-tab-pane>
            <el-tab-pane label="이벤트/열람" name="second"></el-tab-pane>
            <el-tab-pane label="CPU" name="third"></el-tab-pane>
            <el-tab-pane label="서비스" name="fourth"></el-tab-pane>
          </el-tabs>

          <!-- 성능 카드, 정상일 경우 normal / 비정상일 경우 abnormal / 선택됐을 때는 selected -->
          <el-row>
            <div class="perf_status_view">
              <div class="box abnormal selected">
                <div class="content">
                  <p class="num">5</p>
                  <div class="label">종합</div>
                </div>
              </div>
            </div>

            <div class="perf_status_view">
              <div class="box normal">
                <div class="content">
                  <p class="num">0</p>
                  <div class="label">장비 다운</div>
                </div>
              </div>
            </div>

            <div class="perf_status_view">
              <div class="box abnormal">
                <div class="content">
                  <p class="num">3</p>
                  <div class="label">응답시간</div>
                </div>
              </div>
            </div>

            <div class="perf_status_view">
              <div class="box abnormal">
                <div class="content">
                  <p class="num">1</p>
                  <div class="label">CPU</div>
                </div>
              </div>
            </div>

            <div class="perf_status_view">
              <div class="box abnormal">
                <div class="content">
                  <p class="num">1</p>
                  <div class="label">메모리</div>
                </div>
              </div>
            </div>

            <div class="perf_status_view">
              <div class="box normal">
                <div class="content">
                  <p class="num">0</p>
                  <div class="label">온도</div>
                </div>
              </div>
            </div>
          </el-row>

          <!-- 성능 테이블 옵션 -->
          <el-row class="perf_table_options">
            <el-col :span="12">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="이벤트 발생"></el-checkbox>
                <el-checkbox label="관심대상"></el-checkbox>
              </el-checkbox-group>
            </el-col>

            <el-col :span="12">
              <el-input placeholder="search.."
                        suffix-icon="el-icon-search"
                        size="small"></el-input>
              <el-button><i class="fas fa-file-excel"></i>액셀출력</el-button>
            </el-col>
          </el-row>

          <!-- 성능 테이블 옵션 -->
          <!-- state-normal fas fa-circle(정상) ,state-abnormal fas fa-circle(비정상) -->
          <!-- favorite fas fa-star(관심대상), state-none fas fa-star(비관심대상) -->
          <el-row>
            <el-table :data="tableData"
                      stripe
                      width="100%"
                      :default-sort="{prop: 'date'}">
              <el-table-column label="상태"
                               width="20"
                               sortable>
                <template slot-scope="props">
                  <i v-if="!props.row.eventlevelId" class="state-abnormal fas fa-circle"></i>
                  <i v-if="props.row.eventlevelId" class="state-normal fas fa-circle"></i>
                </template>
              </el-table-column>
              <el-table-column prop="objName"
                               label="장비명"
                               sortable>
              </el-table-column>
              <el-table-column prop="ipaddressIpv4"
                               label="IP주소"
                               sortable>
              </el-table-column>
              <el-table-column prop="objCompanyName"
                               label="제조사"
                               sortable>
              </el-table-column>
              <el-table-column prop="objProductId"
                               label="모델"
                               sortable>
              </el-table-column>
              <el-table-column prop="responsetimeIcmp"
                               label="ICNP"
                               sortable>
              </el-table-column>
              <el-table-column prop="responsetimeSnmp"
                               label="SNMP"
                               sortable>
              </el-table-column>
              <el-table-column label="CPU"
                               sortable>
                <template slot-scope="props">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="props.row.cpuUserate"></el-progress>
                </template>
              </el-table-column>
              <el-table-column label="메모리"
                               sortable>
                <template slot-scope="props">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="props.row.memUserate"></el-progress>
                </template>
              </el-table-column>
              <el-table-column label="온도"
                               sortable>
                <template slot-scope="props">
                  <span v-if="props.row.deviceTemp === 'none'">-</span>
                  <span v-else>{{ props.row.deviceTemp }}</span>
                </template>
              </el-table-column>
              <el-table-column label="BPS"
                               style="width:10%">
                <el-table-column prop="bpsIn"
                                 label="IN"
                                 sortable>
                </el-table-column>
                <el-table-column prop="bpsOut"
                                 label="OUT"
                                 sortable>
                </el-table-column>
              </el-table-column>
              <el-table-column label="관리대상"
                               style="width:10%"
                               sortable>
                <template slot-scope="props">
                  <i v-if="props.row.objFavorite" class="favorite fas fa-star"></i>
                  <i v-if="!props.row.objFavorite" class="state-none fas fa-star"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'WPerformance',
    data() {
      return {
        inputService: '',
        requestPath: 'http://127.0.0.1:1212/',
        checkList: [],
        tableData: [
          {
            eventlevelId: true,
            objName: 'Alteon',
            ipaddressIpv4: '172.16.1.241',
            objCompanyName: 'Alteon Networks, Inc',
            objProductId: 'aws3408',
            responsetimeIcmp: 4,
            responsetimeSnmp: 556,
            cpuUserate: 50,
            memUserate: 30,
            deviceTemp: 'none',
            bpsIn: 79474,
            bpsOut: 40701,
            objFavorite: true,
          }],
      };
    },
    created() {
      const self = this;

      // to-be if (self.getTreeData !== undefined)
      axios.get('http://192.168.143.115:8080/modules/common/target/tree.do', {
        params: {
          viewType: 'LOGICAL',
          treeType: 'STATIC',
          managetypeId: 'NMS',
          managetypeKey: 'ND',
          tempTreeKey: 'root',
        },
      })
        .then((res) => {
          // 트리 정보 등록
          self.$store.dispatch('asyncSetTreeData', res.data.children);

          const title = {
            label: self.$store.state.treeData[0].label,
            treeType: self.$store.state.treeData[0].item_level,
            objIp: '',
          };

          // 타이틀 정보 등록
          self.$store.dispatch('asyncSetTitle', title);
        },
        );
    },
    computed: {
      ...mapGetters({
        getTreeData: 'getTreeData',
        getTitle: 'getTitle',
      }),
    },
    watch: {
      inputService(val) {
        this.$refs.tree.filter(val);
      },
    },
    methods: {
      ...mapActions({
        asyncSetTreeData: 'asyncSetTreeData',
        asyncSetTitle: 'asyncSetTitle',
      }),
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(node) {
        const self = this;

        const param = {
          treeType: node.item_level,
          managetypeKey: 'ND',
        };

        const title = {
          label: node.label,
          treeType: node.item_level,
          objIp: '',
        };

        switch (node.item_level) {
          case 'GROUP': {
            param.treeNodeId = node.managegroupId;
            break;
          }
          case 'NETDEVICE': {
            const idx = node.label.indexOf(' ');

            title.label = node.label.substring(0, idx);
            title.objIp = node.objIp;

            param.treeNodeId = node.objId;
            break;
          }
          default: {
            break;
          }
        }

        self.$store.dispatch('asyncSetTitle', title);

        axios.get('http://192.168.143.115:8080/modules/nms/operation/operationstate/get-netdevice-status-count.do', {
          params: {
            param,
          },
        })
          .then((res) => {
            // console.log(res);
          },
          );
      },
    },
  };
</script>

<style>

  /* common */
  .perf_contents {
    background-color: white;
    margin: 0.5%;
  }

  .round input {
    border: 1px solid #618cc5;
    border-radius: 20px;
  }
  /* common */

  /* performanc-section START*/
  .el-container.perf_section.is-vertical {
  }
  /* performanc-section END*/

  /* 헤더부분 css START*/
  .perf_header {
    height: 5% !important;
  }

    .perf_header .el-col:nth-child(2n) {
      display: flex;
      justify-content: flex-end;
    }

    .perf_header .el-col:nth-child(2n+1) {
      display: flex;
      justify-content: flex-start;
    }

    .perf_header .el-col * {
      margin-right: 1%;
      color: #7a7a7a;
    }
  /* 헤더부분 css END*/

  /* 사이드 영역 css START*/
  .el-aside.perf_aside.perf_contents {
    width: 200px !important;
  }

    .el-aside.perf_aside.perf_contents .el-row {
      padding-top: 5%;
    }

  .service_tree {
  }

  .el-aside.perf_aside {
    height: 100%;
  }

  /* 사이드 영역 css END*/

  /* contents 영역 css START*/

  /* contents Header 영역 START */
  .perf_contents_header {
    display: flex;
    align-items: center;
  }

    .perf_contents_header.perf_contents .title_sub {
      border-left: 1px solid black;
      color: black;
    }
  /* contents Header 영역 END */

  /* contents tab START */
  .el-tabs__item.is-top {
    color: #7a7a7a;
  }
  /* contents tab END */

  /* contents card START */
  .perf_status_view {
    width: 16.6667%;
    min-width: 101px;
    max-width: 194.5px;
    height: 90px;
  }
  /* contents card START */

  /* contents Main 영역 START */
  .el-main.perf_contents_main > div {
    margin-bottom: 2%;
  }

  /* contents option 영영 START */
  .el-row.perf_table_options .el-col:nth-child(2n) {
    display: flex;
    justify-content: flex-end;
  }

    .el-row.perf_table_options .el-col:nth-child(2n) .el-input {
      width: 30%;
    }

    .el-row.perf_table_options .el-col:nth-child(2n) .el-button {
      color: #618cc5;
      background-color: #f4f9fe;
    }
  /* contents option 영영 END */
  /* contents Main 영역 END */
  /* contents 영역 css END*/
</style>
