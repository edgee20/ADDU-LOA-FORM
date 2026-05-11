import adduBG from '../images/addu-bg.png';
import adduSeal from '../images/addu-seal-trans.png';
import "@fontsource-variable/geist"
export default function Auth() {
    return(<div>
        <img src={adduBG} alt="ADDU background" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={adduSeal} alt="ADDU seal" />
        </div>
    </div>);
}