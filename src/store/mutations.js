
const mutations =
{
  // Title 정보 등록
  setTitle(state, payload) {
    state.title = payload;
  },
  // 트리 정보 등록
  setTreeData(state, payload) {
    state.treeData = payload;
  },
};

export default mutations;
