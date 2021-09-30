// Necessary to structure the params of dynamodb update request, if we wanted to dynamically update fields

// return both updateexpressions and values formatted for dynamodb *** currently not configured to handle object values
module.exports = (updateBody) => {
    
    const categorizedData = Object.entries(updateBody);

    let updateExpression = 'set ';
    let expressionAttributeNames = {};
    let expressionAttributeValues = {};

    for (let i = 0; i < categorizedData.length; ++i) {
        const expression = `#${categorizedData[i][0]} = :${categorizedData[i][0]}`

        if (i == categorizedData.length - 1) {
            updateExpression += `${expression}`
        }

        else {
            updateExpression += `${expression},`
        }

        expressionAttributeNames[`#${categorizedData[i][0]}`] = categorizedData[i][0];
        expressionAttributeValues[`:${categorizedData[i][0]}`] = categorizedData[i][1];
        
    }

    return {
        updateExpression,
        expressionAttributeNames,
        expressionAttributeValues
    }
}