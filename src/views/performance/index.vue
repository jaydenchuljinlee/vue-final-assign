<template>
    <el-container class="performance-section">

      <!-- 헤더 영역 -->
      <el-header class="performance-header">
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
        <el-aside class="performance-aside performance-contents">

          <!-- 서비스 검색 인풋 -->
          <el-row class="servie-search">
            <el-button>서비스 검색</el-button>
            <i class="fas fa-search"></i>
          </el-row>

          <!-- 서비스 트리 -->
          <el-row class="servie-tree">
            <el-tree :data="treeData"></el-tree>
          </el-row>
        </el-aside>

        <!-- 콘텐츠 영역 -->
        <el-container class="performance-contents">

          <!-- 콘텐츠 헤더 영역 -->
          <el-header class="performance-contents-header performance-contents">
            <span>Local</span>
          </el-header>

          <!-- 콘텐츠 메인 영역 -->
          <el-main class="performance-contents-main formance-contents">

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
            <el-row>
              <el-col :span="12">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="이벤트 발생"></el-checkbox>
                  <el-checkbox label="관심대상"></el-checkbox>
                </el-checkbox-group>
              </el-col>

              <el-col :span="5">
                <el-button></el-button>
                <i class="fas fa-search"></i>
              </el-col>
              <el-col :span="5">
                <el-button><i class="fas fa-file-excel"></i>액셀출력</el-button>
              </el-col>
            </el-row>

            <!-- 성능 테이블 옵션 -->
            <el-row>
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :default-sort = "{prop: 'date'}">
                <el-table-column
                  prop="date"
                  label="상태"
                  width="50"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="장비명"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="IP주소"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="제조사"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="모델"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="ICNP"
                  width="50"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="SNMP"
                  width="50"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="CPU"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="메모리"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="온도"
                  width="80"
                  sortable>
                </el-table-column>
                <el-table-column
                  label="BPS"
                  width="130">
                  <el-table-column
                    prop="address"
                    label="IN"
                    width="65"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="OUT"
                    width="65"
                    sortable>
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="관리대상"
                  width="80"
                  sortable>
                </el-table-column>
              </el-table>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'WPerformance',
  data() {
    return {
      treeData: [
        {
          label: 'Level one 1',
          children: [{
            label: 'Level two 1-1',
          }],
        },
      ],
      checkList: [],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }],
    };
  },
};
</script>

<style>

/* common */
.performance-contents{
  background-color: white;
  margin:0.5%;
}
/* common */

/* performanc-section START*/
.el-container.performance-section.is-vertical{
}
/* performanc-section END*/

/* 헤더부분 css START*/
.performance-header{
  height: 5% !important;
}

.performance-header .el-col:nth-child(2n){
  display: flex;
  justify-content: flex-end;
}

.performance-header .el-col:nth-child(2n+1){
  display: flex;
  justify-content: flex-start;
}

.performance-header .el-col *{
  margin-right: 1%;
  color: #7a7a7a;
}
/* 헤더부분 css END*/

/* 사이드 영역 css START*/
.servie-tree{

}

.el-aside.performance-aside{
  height:100%;
}

/* 사이드 영역 css END*/

/* contents 영역 css START*/

/* contents Header 영역 START */
.performance-contents-header{
  display: flex;
  align-items: center;
}
/* contents Header 영역 END */

/* contents tab START */
.el-tabs__item.is-top{
  color: #7a7a7a;
}
/* contents tab END */

/* contents card START */
.perf_status_view{
  width: 16.6667%;
  min-width: 101px;
  max-width: 194.5px;
  height: 90px;
}
/* contents card START */

/* contents Main 영역 START */
.el-main.performance-contents-main > div{
  margin-bottom: 2%;
}
/* contents Main 영역 END */
/* contents 영역 css END*/
</style>
