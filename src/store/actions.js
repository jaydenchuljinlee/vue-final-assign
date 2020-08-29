
const actions =
{
  // action을 통한 Title 정보 커밋
  asyncSetTitle(context, payload) {
    context.commit('setTitle', payload);
  },
};

export default actions;
