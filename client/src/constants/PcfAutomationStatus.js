import keyMirror from 'keymirror';

export default Object.assign({}, keyMirror({
  RECEIVE_PAYLOAD_PIVNET: null,
  RECEIVE_PAYLOAD_ENVIRONMENTS: null,
  RECEIVE_PAYLOAD_ERROR: null
}), {
  REFRESH_TIME_INTERVAL: 3600000
});
