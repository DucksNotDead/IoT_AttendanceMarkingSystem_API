import Database from 'better-sqlite3';

type TableName = 'attendance' | 'app_logs' | 'students';

interface KeyValue<T> {
  key: keyof T;
  value: unknown;
}

const DB = new Database('db/lite.db');

const commands = {
  where(key: string = 'id') {
    return `WHERE ${key} = ?`;
  },

  and(key: string) {
    return `AND ${key} = ?`;
  },

  select(tableName: TableName, keys?: string[]) {
    return `SELECT ${keys ? keys.join(',') : '*'} FROM ${tableName}`;
  },

  selectWhere(tableName: TableName, key?: string) {
    return `${this.select(tableName)} ${this.where(key)}`;
  },

  selectWhereAnd(tableName: TableName, keys: string[]) {
    const [first, ...andKeys] = keys;
    return first
      ? `${this.selectWhere(tableName, first)} ${andKeys.map(k => this.and(k)).join(' ')}`
      : this.selectWhere(tableName);
  },

  insertInto(tableName: TableName, value: Record<string, unknown>) {
    const keys = Object.keys(value);
    const fieldNames = keys.join(', ');
    const values = keys.map(() => `?`).join(', ');
    return `INSERT INTO ${tableName} (${fieldNames}) VALUES (${values})`;
  },

  deleteFrom(tableName: TableName) {
    return `DELETE FROM ${tableName} ${this.where()}`;
  },
};

function getAll<T>(tableName: TableName, keys?: (keyof T)[]) {
  return DB.prepare(commands.select(tableName, keys as string[])).all() as T[];
}

function getById<T>(tableName: TableName, id: number) {
  return DB.prepare(commands.selectWhere(tableName)).get(id) as T | undefined;
}

function getBy<T>(tableName: TableName, key: keyof T, value: unknown) {
  return DB.prepare(commands.selectWhere(tableName, key as string)).get(
    value,
  ) as T | undefined;
}

function getByAnd<T>(tableName: TableName, keyValues: KeyValue<T>[]) {
  const keys = keyValues.map(kv => kv.key) as string[];
  const values = keyValues.map(kv => kv.value) as unknown[];
  return DB.prepare(commands.selectWhereAnd(tableName, keys)).get(values) as
    | T
    | undefined;
}

function add(tableName: TableName, value: Record<string, unknown>) {
  return DB.prepare(commands.insertInto(tableName, value)).run(
    Object.values(value),
  );
}

function remove(tableName: TableName, id: number) {
  return DB.prepare(commands.deleteFrom(tableName)).run(id);
}

export const db = { getAll, getById, getByAnd, getBy, add, remove };
