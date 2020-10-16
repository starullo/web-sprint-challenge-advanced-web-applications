import React from "react";
import { render, screen, waitFor, getByText, getByTestId } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {fetchColors as mockFetchColors} from '../utils/fetchColors';
import ColorList from './ColorList';

let color = [
{
color: "aquamarine",
code: {
 hex: "#7fffd4"
},
id: 4
}
];
jest.mock('../utils/fetchColors')

test("Fetches data and renders the bubbles", async () => {
  render(<BubblePage />);
  mockFetchColors.mockResolvedValueOnce(color);
  const {getbyText} = render(<ColorList colors={color}/>);
  await waitFor(()=> {
    const aqua = screen.getByTestId(/color/i);
    expect(aqua).toHaveTextContent(/aquamarine/i)
  });
});
