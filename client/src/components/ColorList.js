import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const getColors = () => {
    axiosWithAuth()
    .get('api/colors')
    .then(res=>{
      updateColors(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // useEffect(()=> {
  //   axiosWithAuth()
  //   .get('/api/colors')
  //   .then(res=>{
  //     console.log(res)
  //     updateColors(res.data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }, [colors])



  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      console.log(res)
      updateColors(colors.map(color=>{
        if (color.id === colorToEdit.id) {
          return {code: res.data.code, color: res.data.color, id: res.data.id}
        } else {
          return color
        }
      }))
      setEditing(false)
    })
    .catch(err=>{
      console.log(err)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res=>{
      updateColors(colors.filter(c=> color.id !== c.id))
    })
    .catch(err=>{
      console.log(err)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span data-testid='color'>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
