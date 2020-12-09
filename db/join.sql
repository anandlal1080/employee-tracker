select  

role.title,
IFNULL(CONCAT(m.first_name, ' ', m.last_name),
            'Top Manager') AS 'Manager',
CONCAT(e.first_name,' ',e.last_name) AS 'Direct report'

from employee e
left join employee m on m.id = e.manager_id
inner join role on e.role_id = role.id
ORDER BY manager DESC

