SELECT
    h.name,
    SUM(b.amount) AS total_unpaid
FROM homes h
JOIN bills b
    ON b.home_id = h.id
WHERE b.paid_at IS NULL
GROUP BY h.id, h.name
HAVING SUM(b.amount) > 10000
ORDER BY total_unpaid DESC;

-- Explanation
-- JOIN: connects each bill to its home using home_id = id, so we can see the home’s name next to each bill.
-- WHERE b.paid_at IS NULL: keeps only unpaid bills. This runs before grouping, so paid bills never get added to the total.
-- GROUP BY h.id, h.name: puts all of one home’s unpaid bills into one bucket.
-- SUM(b.amount): adds up the bills in each bucket.
-- HAVING SUM(...) > 10000: filters the groups, keeping only homes whose total is over 10000.
-- ORDER BY total_unpaid DESC: highest total first.