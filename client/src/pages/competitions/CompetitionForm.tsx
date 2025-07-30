import classes from "./competitions.module.css";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import TextBox from "../../components/textbox/textbox";
const CompetitionsForm: React.FC = () => {
  return (
    //Align children center
    <div className={classes.pageContainer}>
      {/* side by side */}
      <div className={classes.formLayout}>
        {/* Title of form */}
        <div className={classes.formTitle}>
          <h1>New Route</h1>
          <button
            className={classes.addButton}
            onClick={() => console.log("hello")}
          >
            +
          </button>
        </div>
        {/* Form Section */}
        <div className={classes.compForm}>
          <p>
            Name <TextBox></TextBox>
          </p>
          <p>
            Number <TextBox></TextBox>
          </p>
          <p>
            Grade <TextBox></TextBox>
          </p>
          <p>
            Color <TextBox></TextBox>
          </p>
          <p>
            Point Value <TextBox></TextBox>
          </p>

          <p>
            Set Date <TextBox></TextBox>
          </p>
          {/* Form Button */}
          <div className={classes.formButton}>
            <Link to="/competitions">
              <Button onClick={() => console.log("did not save")}>
                Create
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsForm;
