import "./CheckBox.css";

export const CheckBox = ({ ...rest }: React.ComponentProps<"input">) => {
  return (
    <div className="checkBoxContainer">
      <input {...rest} type="checkBox" className="checkBox" />
      <label className="checkBox2"></label>
    </div>
  );
};
