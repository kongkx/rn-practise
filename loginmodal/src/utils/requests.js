export function fakeLoginRequest(data, timeout = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() * 1000 > 100;
      if (success) {
        resolve({
          status: true,
          data: {
            token: 'FAKE_TOKEN'
          }
        });
      } else {
        reject({
          status: false,
          message: 'Unauthrozied'
        });
      }
    }, timeout);
  });
}

export function fakeFetchUserInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        username: 'kongkx',
        avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
      });
    }, 300);
  });
}
