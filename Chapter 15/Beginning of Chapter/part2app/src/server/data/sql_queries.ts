const baseSql = `
    SELECT Results.*, name, age, years, nextage FROM Results
    INNER JOIN People ON personId = People.id
    INNER JOIN Calculations ON calculationId = Calculations.id`;

const endSql = `ORDER BY id DESC LIMIT $limit`;

export const queryAllSql = `${baseSql} ${endSql}`;

export const queryByNameSql = `${baseSql} WHERE name = $name ${endSql}`;

export const insertPerson = `
    INSERT INTO People (name)
    SELECT $name
    WHERE NOT EXISTS (SELECT name FROM People WHERE name = $name)`;

export const insertCalculation = `
    INSERT INTO Calculations (age, years, nextage)
    SELECT $age, $years, $nextage
    WHERE NOT EXISTS
	    (SELECT age, years, nextage FROM Calculations 
            WHERE age = $age AND years = $years AND nextage = $nextage)`;

export const insertResult = `
    INSERT INTO Results (personId, calculationId)
    SELECT People.id as personId, Calculations.id as calculationId from People
	CROSS JOIN Calculations
	    WHERE People.name = $name 
		AND Calculations.age = $age 
		AND Calculations.years = $years
		AND Calculations.nextage = $nextage`;
