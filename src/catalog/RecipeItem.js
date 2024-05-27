import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getOneRecipe} from '../api';

import Preloader from '../components/Preloader';

export default function RecipeItem(props) {
    const params = useParams();
    const history = useHistory();

    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOneRecipe(params.id).then(data => {
            data.meals[0].idMeal && setRecipe(data.meals[0]);
            setLoading(false);
        });
    }, [params.id]);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : recipe.idMeal ? (
                <>
                    <h1>{recipe.strMeal}</h1>
                    <p>
                        <button className="btn" onClick={history.goBack}>Go Back</button>
                    </p>
                    <img src={recipe.strMealThumb} alt="" />
                    <p>Category: {recipe.strCategory}</p>
                    {recipe.strArea !== 'Unknown' && <p>Area: {recipe.strArea}</p>}
                    <p>{recipe.strInstructions}</p>

                    <table className='centered'>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(recipe).map((key)=>{
                                if(key.includes("Ingredient") && recipe[key]){
                                    return (
                                        <tr key={key}>
                                            <td>{recipe[key]}</td>
                                            <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>

                    {recipe.strYoutube ? (
                        <div>
                            <br/>
                            <h5>Video:</h5>
                            <iframe title={recipe.title} src={`https://youtube.com/embed/${recipe.strYoutube.slice(-11)}`} allowFullScreen></iframe>
                        </div>
                    ) : null}
                </>
            ) : (
                <p>Не удалось загрузить рецепт</p>
            )}
        </>
    );
}
