/**
 * 用户发送email
 */
export const request_send_email = (payload) => {
  return request.post('/home/home-email-record', {
    body: payload,
  });
};

export const uploadImage = (payload) => {
  return request.post('/tool/upload-file-aws', {
    body: payload,
  });
};
