using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using TaskManagement.Model;


namespace TaskManagement.Data
{
    public class BaseRepository 
    {
        #region Fields
        public readonly IOptions<ConnectionStrings> _connectionString;
        #endregion

        public BaseRepository(IOptions<ConnectionStrings> connectionString)
        {
            _connectionString = connectionString;
        }

        #region SQL Methods

        public async Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string SqlConnectionString = _connectionString.Value.DefaultConnection ?? string.Empty;
            using (SqlConnection con = new(SqlConnectionString))
            {
                await con.OpenAsync();
                return await con.QueryFirstOrDefaultAsync<T>(sql, param, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string SqlConnectionString = _connectionString.Value.DefaultConnection ?? string.Empty;
            using (SqlConnection con = new(SqlConnectionString))
            {
                await con.OpenAsync();
                return await con.QueryAsync<T>(sql, param, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<object> ExecuteScalarAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string SqlConnectionString = _connectionString.Value.DefaultConnection ?? string.Empty;
            using (SqlConnection con = new(SqlConnectionString))
            {
                await con.OpenAsync();
                return await con.ExecuteScalarAsync<object>(sql, param, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> ExecuteAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string SqlConnectionString = _connectionString.Value.DefaultConnection ?? string.Empty;
            using (SqlConnection con = new(SqlConnectionString))
            {
                await con.OpenAsync();
                return await con.ExecuteAsync(sql, param, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<SqlMapper.GridReader> QueryMultipleAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string SqlConnectionString = _connectionString.Value.DefaultConnection ?? string.Empty;
            using (SqlConnection con = new(SqlConnectionString))
            {
                await con.OpenAsync();
                return await con.QueryMultipleAsync(sql, param, commandType: CommandType.StoredProcedure);
            }
        }

        #endregion

        #region Navision SQL Methods

        public async Task<T> NavQueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string NavSqlConnectionString = _connectionString.Value.NavisionConnection ?? string.Empty;
            using SqlConnection con = new(NavSqlConnectionString);
            await con.OpenAsync();
            return await con.QueryFirstOrDefaultAsync<T>(sql, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<T>> NavQueryAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string NavSqlConnectionString = _connectionString.Value.NavisionConnection ?? string.Empty;
            using SqlConnection con = new(NavSqlConnectionString);
            await con.OpenAsync();
            return await con.QueryAsync<T>(sql, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<object> NavExecuteScalarAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string NavSqlConnectionString = _connectionString.Value.NavisionConnection ?? string.Empty;
            using SqlConnection con = new(NavSqlConnectionString);
            await con.OpenAsync();
            return await con.ExecuteScalarAsync<object>(sql, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> NavExecuteAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string NavSqlConnectionString = _connectionString.Value.NavisionConnection ?? string.Empty;
            using SqlConnection con = new(NavSqlConnectionString);
            await con.OpenAsync();
            return await con.ExecuteAsync(sql, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<SqlMapper.GridReader> NavQueryMultipleAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            string NavSqlConnectionString = _connectionString.Value.NavisionConnection ?? string.Empty;
            using SqlConnection con = new(NavSqlConnectionString);
            await con.OpenAsync();
            return await con.QueryMultipleAsync(sql, param, commandType: CommandType.StoredProcedure);
        }

        #endregion

    }
}
