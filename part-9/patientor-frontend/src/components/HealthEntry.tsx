import { HealthCheckEntry, healthRatingColorsType } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@material-ui/core";


const HealthEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return <div>
        <p><Box style={{ color: healthRatingColorsType[entry.healthCheckRating] }}><FavoriteIcon /></Box> </p>
    </div>;
};

export default HealthEntry;