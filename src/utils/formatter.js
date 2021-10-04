export function dropdownUsersList(users) {
  Object.values = (obj) => Object.keys(users).map((key) => obj[key]);

  return Object.values(users).map((user) => ({
    key: user.id,
    text: user.name,
    value: user.id,
    image: { avatar: true, src: user.avatarURL },
  }));
}

export function formatLeaders(users) {
  let leaders = {};
  Object.keys(users).forEach((id) => {
    let user = users[id];
    leaders[user.id] = {
      userAvatar: user.avatarURL,
      userName: user.name,
      userNumAnsweres: Object.keys(user.answers).length,
      userNumQuestions: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length,
    };
  });
  return leaders;
}
