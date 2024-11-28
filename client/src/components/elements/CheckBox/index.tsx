import "./CheckBox.css";

export const CheckBox = (props: React.ComponentProps<"input">) => {
  return (
    <div className="checkBoxContainer">
      <input {...props} type="checkBox" className="checkBoxInput" />
      <label className="checkBoxLabel"></label>
    </div>
  );
};
