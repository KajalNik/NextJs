const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    ASK_QUESTIONS: "/ask-quetions",
    QUESTIONS:(id:string)=> `/quetion/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
    PROFILE: (id: string) => `/profile/${id}`,
  };
  
  export default ROUTES;