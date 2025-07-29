import classes from "./competitions.module.css";
import Button from "../../components/button/button";
import {Link} from "react-router-dom";
import TextBox from '../../components/textbox/textbox';
const CompetitionsForm: React.FC = () => {

  return (
    <div className={classes.alignCenter}>
      <h1>New Route</h1>
      <div className={classes.compForm}>
            
            <p>Name  <TextBox></TextBox></p>
            <p>Number <TextBox></TextBox></p>
            <p>Grade <TextBox></TextBox></p>
            <p>Color <TextBox></TextBox></p>
            <p>Point Value <TextBox></TextBox></p>
            
            <p>Set Date <TextBox></TextBox></p>

            <div className={classes.formButton}>
            <Link to="/competitions">
            <Button onClick={() => console.log('did not save')}>Create</Button>
            </Link>
            </div>
           
        


      </div>
    
    </div>
  )
}

export default CompetitionsForm;