import  Home  from "../app/page"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Home rendering success", () => {
  render(<Home />)

  // 렌더링된 페이지에 특정 글자 추출
  const data = screen.getByText(/Get started by editing/i)
  
  // expect로 비교를 통해 성공, 실패 여부 테스트
  expect(data).toBeInTheDocument();
});
