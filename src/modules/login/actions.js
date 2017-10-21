export const changeMessage = message => dispatch => {
  console.log('action message', message)
  dispatch({
    type: 'CHANGE_MESSAGE',
    message,
  })
}