
import ActionSelect from '../../components/actionSelect/actionSelect';
import { Layout, Menu } from 'antd';
import './overview.scss';
import aman from '../../assets/images/medic.png'; // Tell webpack this JS file uses this image



const Overview = () => {
    return ( 
        <div className='layout' >
            <div className='left-sidebar' style={{
                backgroundImage: `url(${aman})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                height: "100vh",
                borderRadius: "1000px",
                width: "100%"
            }}>

            </div>
            <div className='right-sidebar'>
                <ActionSelect />
            </div>
            
        </div>
    )
}

export default Overview;