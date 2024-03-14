import './directory-item.styles.scss';
import {useNavigate} from "react-router-dom";
const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    return (
        <div className="directory-item-container" onClick={() => navigate(route)}>
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div className="category-item-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;