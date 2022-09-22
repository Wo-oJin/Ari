import { useRecoilState } from "recoil";
import { authState } from "./state";
import NotFound from "./pages/NotFound";

export const AuthRoute = (target, Component) => {
  // 0:비회원, 1:손님, 2:사장님, 3:관리자
  const [auth, setAuth] = useRecoilState(authState);

  if (target === auth) {
    // target 권한에 일치하는 경우
    return Component;
  } else if (auth === 0) {
    // 비회원이 회원 페이지에 접근한 경우
    return <NotFound link="/login" />;
  } else {
    // 이외 권한이 없는 경우
    return <NotFound />;
  }
};
