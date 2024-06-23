export const appRoutes = {
  home: '/users',
  users: '/users',
  userEdit (userId: string) {
    return `/users/edit/${userId}`;
  },
};

export const sectionRoutes = {
  users: '/users/*',
};
