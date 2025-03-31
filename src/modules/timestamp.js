/**
 * 
 * @param {TimeStamp} ts 
 * @returns {String}
 * @description -- Transforme le retour 'number' du timestamp en nom de Sunday à Saturday
 * 
 */
export function getDate(ts) {
    let date = new Date(ts * 1000); // Assure-toi que le timestamp est bien en millisecondes
    let dayNbr = date.getDay(); // Jour de la semaine (0 = Dimanche)
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]; // Crée un tableau pour retranscrire le nombre du jour en nom
    return days[dayNbr]; // Retourne directement le bon jour
}
