
const getters =
{
  // 현재 메뉴의 이름을 가져옴
  getTitle(state) {
    return state.title;
  },
  // 현재 등록된 링크 요소들을 가져옴
  getLinks(state) {
    return state.links;
  },
  // 현재 등록된 트리 요소들을 가져옴
  getTreeData(state) {
    return state.treeData;
  },
};

export default getters;
