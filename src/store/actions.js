
const actions =
{
  // action을 통한 Title 정보 커밋
  asyncSetTitle(context, payload) {
    context.commit('setTitle', payload);
  },
  // action을 통한 트리 정보 커밋
  asyncSetTreeData(context, payload) {
    context.commit('setTreeData', payload);
  },
};

export default actions;
